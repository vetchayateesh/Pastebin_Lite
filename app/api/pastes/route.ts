import { NextRequest } from "next/server";
import { pool } from "@/lib/db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const result = await pool.query(
    "SELECT * FROM pastes WHERE id = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(result.rows[0]);
}
