import { useState } from "react";
import { FormModal } from "../../../components";
import { useCreateLineMutation } from "../../../services/line.service";
import { useGetTrucksQuery } from "../../../services/truck.service";
import { useGetTrailersQuery } from "../../../services/trailer.service";
import { useGetDriversQuery } from "../../../services/driver.service";

interface Truck {
  _id?: string;
  id?: string;
  slug?: string;
  registration: string;
  brand?: string;
  model?: string;
}

interface Trailer {
  _id?: string;
  id?: string;
  slug?: string;
  registration: string;
  brand?: string;
  model?: string;
}

interface Driver {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

type Props = {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  initialValues?: Record<string, unknown>;
  onSubmit?: (values: Record<string, unknown>) => Promise<void>;
};

const LineFormEnhanced = ({
  open,
  onClose,
  title,
  initialValues,
  onSubmit,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [createLine] = useCreateLineMutation();

  // Récupérer les données des camions, remorques et chauffeurs
  const { data: trucks, isLoading: isLoadingTrucks } = useGetTrucksQuery();
  const { data: trailers, isLoading: isLoadingTrailers } =
    useGetTrailersQuery();
  const { data: drivers, isLoading: isLoadingDrivers } = useGetDriversQuery();

  // Préparer les options pour les listes déroulantes
  const truckOptions = trucks
    ? trucks.map((truck: Truck) => ({
        value: truck._id || truck.id || truck.slug || "",
        label: `${truck.registration} - ${truck.brand || ""} ${
          truck.model || ""
        }`.trim(),
      }))
    : [];

  const trailerOptions = trailers
    ? trailers.map((trailer: Trailer) => ({
        value: trailer._id || trailer.id || trailer.slug || "",
        label: `${trailer.registration} - ${trailer.brand || ""} ${
          trailer.model || ""
        }`.trim(),
      }))
    : [];

  const driverOptions = drivers
    ? drivers.map((driver: Driver) => ({
        value: driver._id || driver.id || "",
        label: `${driver.firstName} ${driver.lastName} (${driver.email})`,
      }))
    : [];

  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title={title ?? "Créer une ligne"}
      description="Formulaire pour créer une ligne (route)."
      fields={[
        {
          name: "code",
          label: "Code",
          placeholder: "Code de la ligne",
          required: true,
        },
        {
          name: "truck",
          label: "Camion",
          type: "select",
          options: truckOptions,
          placeholder: isLoadingTrucks
            ? "Chargement..."
            : "Sélectionnez un camion",
          required: true,
        },
        {
          name: "trailer",
          label: "Remorque",
          type: "select",
          options: trailerOptions,
          placeholder: isLoadingTrailers
            ? "Chargement..."
            : "Sélectionnez une remorque",
          required: true,
        },
        {
          name: "driver",
          label: "Chauffeur",
          type: "select",
          options: driverOptions,
          placeholder: isLoadingDrivers
            ? "Chargement..."
            : "Sélectionnez un chauffeur",
          required: true,
        },
        {
          name: "departLocation",
          label: "Départ",
          placeholder: "Ville de départ",
        },
        {
          name: "arriveLocation",
          label: "Arrivée",
          placeholder: "Ville d'arrivée",
        },
        {
          name: "status",
          label: "Statut",
          type: "select",
          options: [
            { value: "a_faire", label: "A faire" },
            { value: "en_cours", label: "En cours" },
            { value: "termine", label: "Terminé" },
          ],
        },
      ]}
      initialValues={initialValues ?? {}}
      onSubmit={
        onSubmit ??
        (async (values: Record<string, unknown>) => {
          try {
            await createLine(values).unwrap();
          } catch (err) {
            // handle error (toast/modal) if needed
            console.error("create line error", err);
          }
          setOpenModal(false);
          onClose?.();
        })
      }
    />
  );
};

export default LineFormEnhanced;
