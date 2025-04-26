import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <div className="flex-grow">
        {/* Page content would go here */}
      </div>
    </main>
  );
}
