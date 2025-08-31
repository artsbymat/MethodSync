import Header from "@/components/Header";

export default function RoomLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
