import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseURL } from "../utils/DataFront/eventTypes";
import ModalBlank from "../components/ModalBlank";
import { useAuth } from "../utils/Auth/AuthContext";
import SpinnerLoading from "../components/SpinnerLoading";
import AuthImage from "../images/pexels-anthonyshkraba-production-8837565.jpg";

function NewResponsable_Profile() {
  const baseUrl = baseURL;
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate("/");
  }

  const [infoModalOpen, setInfoModalOpen] = useState(true);
  const [responsableAddId, setResponsableAddId] = useState(null);
  const [loadingCurrent, setLoadingCurrent] = useState(false);
  const [errorCurrent, setErrorCurrent] = useState(null);

  const [services, setServices] = useState([]);
  const [positions, setPositions] = useState([]);
  const [postes, setPostes] = useState([]);

  const [responsableAdd, setResponsableAdd] = useState(false);
  const [loginAdd, setLoginAdd] = useState(false);

  const [code, setCode] = useState("");
  const [msgErr, setMsgErr] = useState("");
  const [loading, setLoading] = useState(false);

  const [messageR, setMessage] = useState("");

  useEffect(() => {
    // Fonction pour gérer la requête
    const fetchDetails = async () => {
      setLoadingCurrent(true);

      try {
        const responseS = await axios.get(`${baseUrl}/services`);
        const responsePs = await axios.get(`${baseUrl}/postes`);
        const responsePst = await axios.get(`${baseUrl}/positions`);
        setServices(responseS.data);
        setPostes(responsePs.data);
        setPositions(responsePst.data);
      } catch (err) {
        setErrorCurrent(
          err.response?.data?.message ||
            "Erreur inattendue lors de la récupération des données."
        );
        console.error(err);
      } finally {
        setLoadingCurrent(false);
      }
    };

    // Lancer la requête seulement si `responsable` est défini
    fetchDetails();
  }, [baseUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const openInfoModal = () => setInfoModalOpen(true);

  const onSubmit = async (data) => {
    // console.log(data); // Vérifiez les données soumises
    try {
      setLoading(true);

      const response = await axios.post(`${baseUrl}/responsable/nouveau`, data);
      if (response.status === 200) {
        const { responsableId, message } = response.data;
        setMessage(message);
        setResponsableAdd(true);
        setResponsableAddId(responsableId);
        openInfoModal(); // Ouvre le modal directement
      } else {
      }
    } catch (error) {
      if (error.response) {
        setMsgErr(
          error?.response?.data?.message || "Erreur lors de la connexion."
        );
      } else {
        setMsgErr("Problème de connexion au serveur.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmitLogin = async (data) => {
    // console.log(data); // Vérifiez les données soumises
    try {
      setLoading(true);

      const response = await axios.post(
        `${baseUrl}/profiles/nouveau/${responsableAddId}`,
        data
      );
      if (response.status === 200) {
        const { message, code } = response.data;
        setLoginAdd(true);
        setMessage(message);
        setCode(code);
        openInfoModal(); // Ouvre le modal directement
      } else {
      }
    } catch (error) {
      if (error.response) {
        setMsgErr(
          error?.response?.data?.message || "Erreur lors de la connexion."
        );
      } else {
        setMsgErr("Problème de connexion au serveur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative bg-white dark:bg-gray-900">
      {loadingCurrent ? (
        <div className="absolute z-40 flex items-center justify-center w-full h-full bg-white dark:bg-gray-900">
          <SpinnerLoading />
        </div>
      ) : (
        <></>
      )}
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <svg className="fill-violet-500" width={32} height={32}>
                    <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
                  </svg>
                </Link>
              </div>
            </div>

            {!responsableAdd ? (
              <>
                <div className="w-full max-w-xl p-10 px-4 py-8 m-8 mx-auto">
                  <h1 className="mb-6 text-xl font-bold text-gray-800 dark:text-gray-100">
                    Inscription
                  </h1>
                  <p className="mb-4">
                    Bienvenue sur{" "}
                    <span className="font-semibold text-violet-500">
                      la page d'inscription
                    </span>
                    , veillez remplie le formulaire pour vous inscrire.
                  </p>
                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="space-y-4">
                      <div className="flex gap-1">
                        <div className="w-1/2">
                          <label
                            className="block mb-1 text-sm font-medium "
                            htmlFor="nom"
                          >
                            Nom<span className="text-red-500"> *</span>
                          </label>
                          <input
                            id="nom"
                            className={`form-input w-full ${
                              errors.nom ? "border border-red-500" : ""
                            }`}
                            placeholder="Entrez votre nom"
                            {...register("nom", { required: true })}
                          />
                          {errors.nom && (
                            <span className="text-xs text-red-500">
                              Le nom est requis
                            </span>
                          )}
                        </div>
                        <div className="w-1/2">
                          <label
                            className="block mb-1 text-sm font-medium "
                            htmlFor="prenom"
                          >
                            Prenom<span className="text-red-500"> *</span>
                          </label>
                          <input
                            id="prenom"
                            placeholder="Entrez votre prenom"
                            className={`form-input w-full ${
                              errors.prenom ? "border border-red-500" : ""
                            }`}
                            {...register("prenom", { required: true })}
                          />
                          {errors.prenom && (
                            <span className="text-xs text-red-500">
                              Le prenom est requis
                            </span>
                          )}
                        </div>
                      </div>

                      {/* poste */}
                      <div>
                        <label
                          className="block mb-1 text-sm font-medium "
                          htmlFor="poste"
                        >
                          Poste<span className="text-gray-500"> *</span>
                        </label>
                        <input
                          id="poste"
                          placeholder="Entrez votre poste"
                          className="w-full form-input"
                          {...register("poste", { required: false })}
                        />
                        {errors.poste && (
                          <span className="text-xs text-red-500">
                            Le poste est requis
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between gap-2 mb-5">
                        <div className="relative w-1/3">
                          <label
                            htmlFor="idService"
                            className="block mb-1 text-sm font-medium"
                          >
                            Service <span className="text-red-500">*</span>
                          </label>
                          <select
                            {...register("idService", {
                              required: "Le service est requis",
                            })}
                            className={`form-input w-full ${
                              errors.idService ? "border border-red-500" : ""
                            }`}
                          >
                            {services.map((service) => (
                              <option key={service.id} value={`${service.id}`}>
                                {service.libelle}
                              </option>
                            ))}
                          </select>
                          {errors.idService && (
                            <p className="absolute left-0 text-xs text-red-500 sm:-bottom-9 md:-bottom-5">
                              {errors.idService.message}
                            </p>
                          )}
                        </div>
                        <div className="relative w-1/3">
                          <label
                            htmlFor="idPoste"
                            className="block mb-1 text-sm font-medium"
                          >
                            Poste <span className="text-red-500">*</span>
                          </label>
                          <select
                            {...register("idPoste", {
                              required: "Le poste est requis",
                            })}
                            className={`form-input w-full ${
                              errors.idPoste ? "border border-red-500" : ""
                            }`}
                          >
                            {postes.map((poste) => (
                              <option key={poste.id} value={`${poste.id}`}>
                                {poste.libelle}
                              </option>
                            ))}
                          </select>
                          {errors.idPoste && (
                            <p className="absolute left-0 text-xs text-red-500 sm:-bottom-9 md:-bottom-5">
                              {errors.idPoste.message}
                            </p>
                          )}
                        </div>
                        <div className="relative w-1/3">
                          <label
                            htmlFor="idPosition"
                            className="block mb-1 text-sm font-medium"
                          >
                            Position <span className="text-red-500">*</span>
                          </label>
                          <select
                            {...register("idPosition", {
                              required: "La position est requise",
                            })}
                            className={`form-input w-full ${
                              errors.idPosition ? "border border-red-500" : ""
                            }`}
                          >
                            {positions.map((position) => (
                              <option
                                key={position.id}
                                value={`${position.id}`}
                              >
                                {position.libelle}
                              </option>
                            ))}
                          </select>
                          {errors.idPosition && (
                            <p className="absolute left-0 text-xs text-red-500 sm:-bottom-9 md:-bottom-5">
                              {errors.idPosition.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center my-6">
                      {(msgErr || errorCurrent) && (
                        <span className="text-xs text-red-500">
                          {msgErr || errorCurrent}
                        </span>
                       )}
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <button
                        type="submit"
                        className="bg-white border-gray-200 btn dark:bg-gray-800 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600"
                      >
                        {loading ? (
                          <>
                            <svg
                              className="fill-current animate-spin shrink-0"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                            </svg>
                          </>
                        ) : (
                          <div className="flex items-center gap-1">
                            Soumettre
                            <svg
                              className="fill-current text-violet-500 shrink-0"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                  </form>
                  <div className="pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60">
                    <div className="text-sm">
                      Vous avez un compte ?
                      <Link
                        className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
                        to="/"
                      >
                        {" "}
                        Connectez vous
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full max-w-sm p-10 px-4 py-8 mx-auto border-2 border-dashed rounded-lg border-violet-500 outline-4">
                  <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-100">
                    AJoutez votre login à votre compte
                  </h1>
                  {/* Form d'ajout de login */}
                  <form onSubmit={handleSubmit(onSubmitLogin)} className="">
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block mb-1 text-sm font-medium "
                          htmlFor="login"
                        >
                          Login<span className="text-red-500"> *</span>
                        </label>
                        <input
                          id="login"
                          className="w-full form-input"
                          placeholder="Entrez votre login"
                          type="email"
                          {...register("login", { required: true })}
                        />
                        {errors.login && (
                          <span className="text-xs text-red-500">
                            Ce champ est requis
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-center my-2">
                      {msgErr ? (
                        <span className="text-xs text-red-500">{msgErr}</span>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <button
                        type="submit"
                        className="bg-white border-gray-200 btn dark:bg-gray-800 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600"
                      >
                        {loading ? (
                          <>
                            <svg
                              className="fill-current animate-spin shrink-0"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                            </svg>
                          </>
                        ) : (
                          <div className="flex items-center gap-1">
                            Valider
                            <svg
                              className="fill-current text-violet-500 shrink-0"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z" />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Image */}
        <div
          className="absolute top-0 bottom-0 right-0 hidden md:block md:w-1/2"
          aria-hidden="true"
        >
          <img
            className="object-cover object-center w-full h-full"
            src={AuthImage}
            width="760"
            height="1024"
            alt="Authentication"
          />
        </div>
      </div>

      <ModalBlank
        id="info-modal"
        modalOpen={infoModalOpen}
        setModalOpen={setInfoModalOpen}
      >
        <div className="flex p-5 space-x-4">
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full shrink-0 dark:bg-gray-700">
            <svg
              className="fill-current shrink-0 text-violet-500"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
            </svg>
          </div>
          {/* Content */}
          <div>
            {/* Modal header */}
            <div className="mb-2">
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {responsableAddId && loginAdd
                  ? "Votre login a été bien ajouter, veillez valider votre compte avec ce code de validation!"
                  : "Vous avez été bien enregistrer!!"}
              </div>
            </div>
            {/* Modal content */}
            <div className="text-center text-gray-600 dark:text-gray-400">
              <div className="mb-10 text-sm">
                <div className="space-y-1">
                  <p>{messageR && messageR}</p>
                </div>
                {responsableAddId && loginAdd ? (
                  <>
                    <br />
                    <h1 className="text-xl font-bold">{code && code}</h1>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="text-gray-800 border-gray-200 btn-sm dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  if (responsableAddId && loginAdd) {
                    navigate("/profiles/validation");
                  } else {
                    setInfoModalOpen(false);
                  }
                }}
              >
                {responsableAddId && loginAdd
                  ? "Valider le compte"
                  : "Ajouter le login"}
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
    </main>
  );
}

export default NewResponsable_Profile;
