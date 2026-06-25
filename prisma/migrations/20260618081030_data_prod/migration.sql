/*
  Warnings:

  - The primary key for the `Questionnaire` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `Questionnaire` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questionnaire" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "denomination_sociale" TEXT NOT NULL,
    "adresse_facturation" TEXT NOT NULL,
    "complement_adresse" TEXT,
    "code_postal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "siren" TEXT NOT NULL,
    "tva" TEXT NOT NULL,
    "plateforme" TEXT NOT NULL,
    "format_identifiant" TEXT NOT NULL,
    "routing_siret_code" TEXT,
    "routing_siret_description" TEXT,
    "routing_suffixe_code" TEXT,
    "routing_suffixe_description" TEXT,
    "routing_id_code" TEXT,
    "routing_id_description" TEXT,
    "contact_nom_prenom" TEXT NOT NULL,
    "contact_adresse_email" TEXT NOT NULL
);
INSERT INTO "new_Questionnaire" ("adresse_facturation", "code_postal", "complement_adresse", "contact_adresse_email", "contact_nom_prenom", "denomination_sociale", "format_identifiant", "id", "plateforme", "routing_id_code", "routing_id_description", "routing_siret_code", "routing_siret_description", "routing_suffixe_code", "routing_suffixe_description", "siren", "tva", "ville") SELECT "adresse_facturation", "code_postal", "complement_adresse", "contact_adresse_email", "contact_nom_prenom", "denomination_sociale", "format_identifiant", "id", "plateforme", "routing_id_code", "routing_id_description", "routing_siret_code", "routing_siret_description", "routing_suffixe_code", "routing_suffixe_description", "siren", "tva", "ville" FROM "Questionnaire";
DROP TABLE "Questionnaire";
ALTER TABLE "new_Questionnaire" RENAME TO "Questionnaire";
CREATE UNIQUE INDEX "Questionnaire_siren_key" ON "Questionnaire"("siren");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
