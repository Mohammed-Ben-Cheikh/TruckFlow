import type { ReactNode } from "react";

const Page = ({
  header,
  children,
}: {
  header?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <>
      {header && (
        <div className="border-b bg-white h-[10vh] px-6 py-4 flex items-center justify-between">
          {header}
        </div>
      )}
      <div className="p-6 overflow-y-auto h-[90vh]">{children}</div>
    </>
  );
};

export default Page;
