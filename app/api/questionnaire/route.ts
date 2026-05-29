import { NextResponse } from "next/server";

import { createQuestionnaire, sirenExists } from "@/lib/questionnaire";
import { questionnaireSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = questionnaireSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    // Vérification doublon SIREN
    const exists = await sirenExists(body.siren);

    if (exists) {
      return NextResponse.json(
        {
          error: "Ce numéro SIREN existe déjà.",
        },
        {
          status: 409,
        },
      );
    }

    // Création
    await createQuestionnaire(parsed.data);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erreur serveur.",
      },
      {
        status: 500,
      },
    );
  }
}
