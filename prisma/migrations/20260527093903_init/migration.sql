-- CreateTable
CREATE TABLE "Questionnaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "contact_adresse_email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaire_siren_key" ON "Questionnaire"("siren");
