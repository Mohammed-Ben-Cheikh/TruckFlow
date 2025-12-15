import Page from "../../../components/layout/Page";

const Line = () => {
  return (
    <Page
      header={
        <>
          <div>
            <h1 className="text-xl font-semibold">Tableau de bord</h1>
            <p className="text-sm text-slate-500">
              Base UI pour créer vos pages TruckFlow.
            </p>
          </div>
          {/* <Button onClick={() => setOpenModal(true)}>Nouveau camion</Button> */}
        </>
      }
    >
      <h1>Bienvenue sur le tableau de bord</h1>
    </Page>
  );
};

export default Line;
