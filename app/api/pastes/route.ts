import { NextRequest } from "next/server";
import { pool } from "@/lib/db";

type Params = {
  id: string;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;

  const result = await pool.query(
    "SELECT * FROM pastes WHERE id = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return Response.json({ error: "Paste not found" }, { status: 404 });
  }

  return Response.json(result.rows[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;

  await pool.query("DELETE FROM pastes WHERE id = $1", [id]);

  return Response.json({ success: true });
}
