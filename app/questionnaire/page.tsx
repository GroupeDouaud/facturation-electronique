"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionnaireSchema, type QuestionnaireType } from "@/lib/validation";

export default function QuestionnairePage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuestionnaireType>({
    resolver: zodResolver(questionnaireSchema),
  });

  // ✅ WATCH UNE SEULE FOIS
  const selectedFormat = watch("format_identifiant");

  const onSubmit = async (data: QuestionnaireType) => {
    try {
      setLoading(true);

      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error);
        return;
      }

      alert("Renseignements envoyés avec succès !");
    } catch (error) {
      console.error(error);
      alert("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-20">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-xl">
        {/* HEADER */}
        <div className="mb-12 flex flex-col items-center gap-6">
          <img src="./douaud.png" alt="Logo DOUAUD" className="w-2/3" />
          <h2 className="text-center text-2xl font-semibold leading-relaxed text-gray-900">
            Dans le cadre de la réforme de la facturation électronique du Groupe
            DOUAUD, nous vous remercions de bien vouloir compléter le
            questionnaire ci-dessous.
          </h2>
          <div className="w-full flex justify-start">
            <p className="text-sm font-medium text-red-500">
              * Champ obligatoire
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Dénomination sociale */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-800">
              Dénomination sociale exacte de votre société
              <span className="ml-1 text-gray-500">
                (Disponible sur l'extrait Kbis)
              </span>
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              {...register("denomination_sociale")}
              placeholder="Écrivez votre dénomination sociale"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-black placeholder:text-[15px] placeholder:font-medium placeholder:text-gray-600"
            />

            {errors.denomination_sociale && (
              <p className="mt-2 text-sm text-red-500">
                {errors.denomination_sociale.message}
              </p>
            )}
          </div>

          {/* Adresse */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-800">
              Adresse de facturation (Numéro / Nom de rue)
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              {...register("adresse_facturation")}
              placeholder="Écrivez votre adresse de facturation"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-black placeholder:text-[15px] placeholder:font-medium placeholder:text-gray-600"
            />

            {errors.adresse_facturation && (
              <p className="mt-2 text-sm text-red-500">
                {errors.adresse_facturation.message}
              </p>
            )}
          </div>

          {/* Complément adresse */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-800">
              Complément d'adresse
            </label>

            <input
              {...register("complement_adresse")}
              placeholder="Écrivez votre complément d'adresse"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-black placeholder:text-[15px] placeholder:font-medium placeholder:text-gray-600"
            />
          </div>

          {/* Code postal */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-800">
              Code postal
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              {...register("code_postal")}
              placeholder="Écrivez votre code postal"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-black placeholder:text-[15px] placeholder:font-medium placeholder:text-gray-600"
            />

            {errors.code_postal && (
              <p className="mt-2 text-sm text-red-500">
                {errors.code_postal.message}
              </p>
            )}
          </div>

          {/* Ville */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-800">
              Ville
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              {...register("ville")}
              placeholder="Écrivez votre ville"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-black placeholder:text-[15px] placeholder:font-medium placeholder:text-gray-600"
            />

            {errors.ville && (
              <p className="mt-2 text-sm text-red-500">
                {errors.ville.message}
              </p>
            )}
          </div>

          {/* SIREN */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-800">
              Numéro SIREN
              <span className="ml-1 text-gray-500">
                (9 chiffres obligatoires)
              </span>
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              {...register("siren")}
              placeholder="Écrivez votre numéro de SIREN"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-black placeholder:text-[15px] placeholder:font-medium placeholder:text-gray-600"
            />

            {errors.siren && (
              <p className="mt-2 text-sm text-red-500">
                {errors.siren.message}
              </p>
            )}
          </div>

          {/* TVA */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-800">
              Numéro de TVA intracommunautaire
              <span className="ml-1 text-gray-500">
                (13 caractères obligatoires)
              </span>
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              {...register("tva")}
              placeholder="Écrivez votre numéro de TVA"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-black placeholder:text-[15px] placeholder:font-medium placeholder:text-gray-600"
            />

            {errors.tva && (
              <p className="mt-2 text-sm text-red-500">{errors.tva.message}</p>
            )}
          </div>

          {/* Plateforme */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-800">
              Nom de votre Plateforme Agréée (PA)
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              {...register("plateforme")}
              placeholder="Écrivez le nom de votre plateforme"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-black placeholder:text-[15px] placeholder:font-medium placeholder:text-gray-600"
            />

            {errors.plateforme && (
              <p className="mt-2 text-sm text-red-500">
                {errors.plateforme.message}
              </p>
            )}
          </div>

          {/* FORMAT IDENTIFIANT */}
          <div className="rounded-2xl border border-gray-300 p-6">
            <label className="mb-5 block text-sm font-semibold text-gray-800">
              Quel est le code de routage que vous avez choisi ? Merci
              d'indiquer vos différentes adresses d'identifiant utilisées pour
              la facturation
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="space-y-5">
              {/* SIREN */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  value="SIREN"
                  {...register("format_identifiant")}
                  className="h-5 w-5"
                />

                <span className="text-gray-700">SIREN</span>
              </label>

              {/* SIREN + SIRET */}
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    value="SIREN + SIRET"
                    {...register("format_identifiant")}
                    className="h-5 w-5"
                  />

                  <span className="text-gray-700">SIREN + SIRET</span>
                </label>

                {selectedFormat === "SIREN + SIRET" && (
                  <div className="ml-7 border-l-2 border-orange-200 pl-5">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        {...register("routing_siret_code")}
                        placeholder="Code routage"
                        className="h-11 rounded-xl border border-gray-200 px-4 text-gray-900 outline-none focus:border-black placeholder:text-gray-600"
                      />

                      <input
                        {...register("routing_siret_description")}
                        placeholder="Description du type de facturation"
                        className="h-11 rounded-xl border border-gray-200 px-4 text-gray-900 outline-none focus:border-black placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SIREN + SUFFIXE */}
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    value="SIREN + SUFFIXE"
                    {...register("format_identifiant")}
                    className="h-5 w-5"
                  />

                  <span className="text-gray-700">SIREN + SUFFIXE</span>
                </label>

                {selectedFormat === "SIREN + SUFFIXE" && (
                  <div className="ml-7 border-l-2 border-orange-200 pl-5">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        {...register("routing_suffixe_code")}
                        placeholder="Code suffixe"
                        className="h-11 rounded-xl border border-gray-200 px-4 text-gray-900 outline-none focus:border-black placeholder:text-gray-600"
                      />

                      <input
                        {...register("routing_suffixe_description")}
                        placeholder="Description du type de facturation"
                        className="h-11 rounded-xl border border-gray-200 px-4 text-gray-900 outline-none focus:border-black placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SIREN + SIRET + ID */}
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="radio"
                    value="SIREN + SIRET + ID de routage"
                    {...register("format_identifiant")}
                    className="h-5 w-5"
                  />

                  <span className="text-gray-700">
                    SIREN + SIRET + ID de routage
                  </span>
                </label>

                {selectedFormat === "SIREN + SIRET + ID de routage" && (
                  <div className="ml-7 border-l-2 border-orange-200 pl-5">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        {...register("routing_id_code")}
                        placeholder="ID routage"
                        className="h-11 rounded-xl border border-gray-200 px-4 text-gray-900 outline-none focus:border-black placeholder:text-gray-600"
                      />

                      <input
                        {...register("routing_id_description")}
                        placeholder="Description du type de facturation"
                        className="h-11 rounded-xl border border-gray-200 px-4 text-gray-900 outline-none focus:border-black placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* NON DEFINI */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  value="Non défini à date"
                  {...register("format_identifiant")}
                  className="h-5 w-5"
                />

                <span className="text-gray-700">Non défini à date</span>
              </label>
            </div>

            {errors.format_identifiant && (
              <p className="mt-4 text-sm text-red-500">
                {errors.format_identifiant.message}
              </p>
            )}
          </div>

          {/* CONTACT */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-800">
              Nom et prénom du contact dédié RFE
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              {...register("contact_nom_prenom")}
              placeholder="Écrivez le nom et prénom de votre contact"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-black placeholder:text-[15px] placeholder:font-medium placeholder:text-gray-600"
            />

            {errors.contact_nom_prenom && (
              <p className="mt-2 text-sm text-red-500">
                {errors.contact_nom_prenom.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-800">
              Adresse e-mail de votre du contact dédié RFE
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              {...register("contact_adresse_email")}
              placeholder="Écrivez l'adresse mail de votre contact"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-gray-900 outline-none transition focus:border-black placeholder:text-[15px] placeholder:font-medium placeholder:text-gray-600"
            />

            {errors.contact_adresse_email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.contact_adresse_email.message}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-black px-6 py-5 text-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Envoi en cours..." : "Envoyer le questionnaire"}
          </button>
        </form>
      </div>
    </main>
  );
}
