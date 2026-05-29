import { prisma } from "./prisma";

/**
 * Type utilisé côté backend (aligné avec le formulaire)
 */
export interface QuestionnaireData {
  denomination_sociale: string;
  adresse_facturation: string;
  complement_adresse?: string;
  code_postal: string;
  ville: string;

  siren: string;
  tva: string;

  plateforme: string;

  format_identifiant:
    | "SIREN"
    | "SIREN + SIRET"
    | "SIREN + SUFFIXE"
    | "SIREN + SIRET + ID de routage"
    | "Non défini à date";

  routing_siret_code?: string;
  routing_siret_description?: string;

  routing_suffixe_code?: string;
  routing_suffixe_description?: string;

  routing_id_code?: string;
  routing_id_description?: string;

  contact_nom_prenom: string;
  contact_adresse_email: string;
}

export async function sirenExists(siren: string): Promise<boolean> {
  const existing = await prisma.questionnaire.findUnique({
    where: { siren },
    select: { id: true },
  });

  return !!existing;
}

export async function createQuestionnaire(data: QuestionnaireData) {
  // Sécurité anti doublon (UX propre)
  const exists = await prisma.questionnaire.findUnique({
    where: { siren: data.siren },
  });

  if (exists) {
    throw new Error("Ce SIREN existe déjà");
  }

  return await prisma.questionnaire.create({
    data: {
      denomination_sociale: data.denomination_sociale,
      adresse_facturation: data.adresse_facturation,
      complement_adresse: data.complement_adresse,

      code_postal: data.code_postal,
      ville: data.ville,

      siren: data.siren,
      tva: data.tva,

      plateforme: data.plateforme,

      format_identifiant: data.format_identifiant,

      routing_siret_code: data.routing_siret_code,
      routing_siret_description: data.routing_siret_description,

      routing_suffixe_code: data.routing_suffixe_code,
      routing_suffixe_description: data.routing_suffixe_description,

      routing_id_code: data.routing_id_code,
      routing_id_description: data.routing_id_description,

      contact_nom_prenom: data.contact_nom_prenom,
      contact_adresse_email: data.contact_adresse_email,
    },
  });
}
