import { z } from "zod";

export const questionnaireSchema = z.object({
  denomination_sociale: z
    .string()
    .min(1, "La dénomination sociale est obligatoire"),

  adresse_facturation: z.string().min(1, "L'adresse est obligatoire"),

  complement_adresse: z.string().optional(),

  code_postal: z.string().min(1, "Le code postal est obligatoire"),

  ville: z.string().min(1, "La ville est obligatoire"),

  siren: z
    .string()
    .regex(/^[0-9]{9}$/, "Le numéro SIREN doit contenir exactement 9 chiffres"),

  tva: z
    .string()
    .length(13, "Le numéro de TVA doit contenir exactement 13 caractères"),

  plateforme: z.string().min(1, "La plateforme est obligatoire"),

  format_identifiant: z.enum([
    "SIREN",
    "SIREN + SIRET",
    "SIREN + SUFFIXE",
    "SIREN + SIRET + ID de routage",
    "Non défini à date",
  ]),

  routing_siret_code: z.string().optional(),
  routing_siret_description: z.string().optional(),

  routing_suffixe_code: z.string().optional(),
  routing_suffixe_description: z.string().optional(),

  routing_id_code: z.string().optional(),
  routing_id_description: z.string().optional(),

  contact_nom_prenom: z.string().min(1, "Le nom du contact est obligatoire"),

  contact_adresse_email: z.string().email("Adresse e-mail invalide"),
});

export type QuestionnaireType = z.infer<typeof questionnaireSchema>;
