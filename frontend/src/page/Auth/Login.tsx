import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "router-kit";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/InputField";
import { useLoginMutation } from "../../services/auth.service";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../stores/auth/authSlice";

const Login = () => {
  const { navigate } = useRouter();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "Email requis";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      e.email = "Email invalide";
    if (!password) e.password = "Mot de passe requis";
    else if (password.length < 6)
      e.password = "Le mot de passe doit contenir au moins 6 caractères";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;
    dispatch(loginStart());
    setErrors({});
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(loginSuccess({ user: result.user, token: result.token }));
      navigate("/", { replace: true });
    } catch (err) {
      const errorMessage =
        (err as { data?: { message?: string } }).data?.message ||
        "Échec de l'authentification";
      dispatch(loginFailure(errorMessage));
      setErrors({ form: errorMessage });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col gap-6 p-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
          <h2 className="text-3xl font-bold">Bienvenue sur TruckFlow</h2>
          <p className="text-sm opacity-90">
            Gestion complète des flottes — tableaux de bord, suivi et
            maintenance en un seul endroit.
          </p>
          <div className="mt-auto opacity-95">
            <svg
              viewBox="0 0 640 512"
              className="w-full h-56 opacity-90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0"
                y="0"
                width="640"
                height="512"
                rx="24"
                fill="rgba(255,255,255,0.06)"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-slate-800">
              Se connecter
            </h1>
            <p className="text-sm text-slate-500">
              Entrez vos identifiants pour accéder à votre compte
            </p>
          </div>

          {errors.form && (
            <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
              {errors.form}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <InputField
              label="Email"
              placeholder="votre@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              type="email"
            />

            <InputField
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              type="password"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300"
                />
                Se souvenir de moi
              </label>
              <a
                href="/auth/reset"
                className="text-sm text-blue-600 hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>

            <div>
              <Button type="submit" isLoading={false} className="w-full">
                Se connecter
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Pas encore de compte ?{" "}
            <a href="/auth/register" className="text-blue-600 hover:underline">
              Créer un compte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
