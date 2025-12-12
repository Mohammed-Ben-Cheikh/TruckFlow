import { useState } from "react";
import { Link } from "router-kit";
import {
  Button,
  DashboardLayout,
  InputField,
  Modal,
  type NavItem,
} from "../../components";

const navItems: NavItem[] = [
  { label: "Tableau de bord", href: "/" },
  { label: "Camions", href: "/trucks" },
  { label: "Remorques", href: "/trailers" },
  { label: "Pneus", href: "/tires" },
  { label: "Lignes", href: "/lines" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Suivi", href: "/tracking" },
  { label: "Utilisateurs", href: "/users" },
];

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [truckName, setTruckName] = useState("");
  const [license, setLicense] = useState("");

  return (
    <DashboardLayout
      navItems={navItems}
      header={
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Tableau de bord</h1>
            <p className="text-sm text-slate-500">
              Base UI pour créer vos pages TruckFlow.
            </p>
          </div>
          <Button onClick={() => setOpenModal(true)}>Nouveau camion</Button>
        </div>
      }
    >
      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold">Actions rapides</h2>
          <p className="text-sm text-slate-500">
            Utilisez ces liens pour accéder aux modules CRUD.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-lg border px-3 py-2 text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold">Composants prêts</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
            <li>Sidebar navigable avec état actif automatique</li>
            <li>Champs de formulaire avec label, hint et erreurs</li>
            <li>Modale réutilisable pour créer ou éditer</li>
            <li>Boutons avec variantes et chargement</li>
          </ul>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Créer un camion"
        description="Formulaire court pour illustrer l'utilisation des inputs."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpenModal(false)}>
              Fermer
            </Button>
            <Button
              onClick={() => {
                // Placeholder action; hook to backend mutation later.
                setOpenModal(false);
              }}
              disabled={!truckName || !license}
            >
              Sauvegarder
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <InputField
            label="Nom du camion"
            placeholder="Ex: Volvo FH16"
            value={truckName}
            onChange={(e) => setTruckName(e.target.value)}
          />
          <InputField
            label="Immatriculation"
            placeholder="Ex: 123-AB-45"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            hint="Conservez le format utilisé dans le backend."
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Home;
