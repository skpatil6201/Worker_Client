import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "data");
const INTERVIEWS_FILE = join(DATA_DIR, "interviews.json");
const PORT = Number(process.env.PORT || 8081);

const sendJson = (res, status, payload) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  res.end(JSON.stringify(payload));
};


const readJsonBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
};

const ensureStore = async () => {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(INTERVIEWS_FILE, "utf8");
  } catch {
    await writeFile(INTERVIEWS_FILE, "[]", "utf8");
  }
};

const getInterviews = async () => {
  await ensureStore();
  const content = await readFile(INTERVIEWS_FILE, "utf8");
  return JSON.parse(content || "[]");
};

const saveInterviews = async (interviews) => {
  await ensureStore();
  await writeFile(INTERVIEWS_FILE, JSON.stringify(interviews, null, 2), "utf8");
};

const isMatch = (left, right) => {
  return left && right && String(left) === String(right);
};

const server = createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      sendJson(res, 200, { success: true, message: "Interview backend is running" });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/interviews") {
      const payload = await readJsonBody(req);
      const requiredFields = ["applicationId", "candidateName", "candidateEmail", "jobTitle", "company", "date", "time", "type", "round", "interviewer"];
      const missingFields = requiredFields.filter(field => !payload[field]);

      if (missingFields.length > 0) {
        sendJson(res, 400, {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`
        });
        return;
      }

      const interviews = await getInterviews();
      const interview = {
        id: randomUUID(),
        status: "Scheduled",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        meetingLink: "",
        location: "",
        notes: "",
        ...payload
      };

      interviews.unshift(interview);
      await saveInterviews(interviews);
      sendJson(res, 201, { success: true, data: interview });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/interviews/candidate/current") {
      const candidateId = url.searchParams.get("candidateId");
      const candidateEmail = url.searchParams.get("candidateEmail");
      const interviews = await getInterviews();
      const filtered = interviews.filter(interview => (
        isMatch(interview.candidateId, candidateId) || isMatch(interview.candidateEmail, candidateEmail)
      ));

      sendJson(res, 200, { success: true, data: filtered });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/interviews/firm/current") {
      const firmId = url.searchParams.get("firmId");
      const company = url.searchParams.get("company");
      const interviews = await getInterviews();
      const filtered = interviews.filter(interview => (
        isMatch(interview.firmId, firmId) || isMatch(interview.company, company)
      ));

      sendJson(res, 200, { success: true, data: filtered });
      return;
    }

    const statusMatch = url.pathname.match(/^\/api\/interviews\/([^/]+)\/status$/);
    if (req.method === "PUT" && statusMatch) {
      const [, interviewId] = statusMatch;
      const payload = await readJsonBody(req);
      const interviews = await getInterviews();
      const index = interviews.findIndex(interview => interview.id === interviewId);

      if (index === -1) {
        sendJson(res, 404, { success: false, message: "Interview not found" });
        return;
      }

      interviews[index] = {
        ...interviews[index],
        status: payload.status || interviews[index].status,
        updatedAt: new Date().toISOString()
      };

      await saveInterviews(interviews);
      sendJson(res, 200, { success: true, data: interviews[index] });
      return;
    }

    sendJson(res, 404, { success: false, message: "Route not found" });
  } catch (error) {
    sendJson(res, 500, {
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
});

server.listen(PORT, () => {
  console.log(`Interview backend running at http://localhost:${PORT}`);
});
