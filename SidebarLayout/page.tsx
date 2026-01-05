import Image from "next/image";

export default function HomePage() {
  return (
    <div className="home-wrapper">
      {/* Background */}
      <div className="home-bg" />

      {/* Center Card */}
      <div className="home-card">
        <Image
          src="/kds-lightgray.png"
          alt="KDS Logo"
          width={140}
          height={60}
          className="mx-auto mb-4"
          priority
        />

        <h2 className="text-xl font-semibold mb-2">
          Kiewit Power Delivery
        </h2>
        <h3 className="text-lg font-medium mb-3">
          Structure Database
        </h3>

        <p className="text-sm text-muted-foreground">
          Access your different tools via the left menu.
        </p>
      </div>
    </div>
  );
}
