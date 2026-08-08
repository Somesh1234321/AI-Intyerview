import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    openapi: "3.0.3",
    info: {
      title: "AI Interview Agent API Specification",
      version: "1.0.0",
      description: "API Specification for conducting technical interviews for the 31-Day AI Cohort.",
    },
    paths: {
      "/api/interview/start": {
        post: {
          summary: "Start a new interview session",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    candidate_id: { type: "string", example: "cand-alex-chen" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Session initialized with first question." },
          },
        },
      },
      "/api/interview/respond": {
        post: {
          summary: "Submit candidate answer and retrieve AI follow-up / pivot question",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["interview_id", "response_text"],
                  properties: {
                    interview_id: { type: "string" },
                    response_text: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Evaluated last turn and generated next question." },
          },
        },
      },
      "/api/interview/feedback": {
        post: {
          summary: "Finalize interview session and generate structured evaluation report",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["interview_id"],
                  properties: {
                    interview_id: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Structured feedback report produced." },
          },
        },
      },
      "/api/candidates": {
        get: {
          summary: "List synthetic candidate profiles and learning signals",
        },
      },
      "/api/curriculum": {
        get: {
          summary: "Get full 31-day curriculum JSON schema",
        },
      },
    },
  });
}
