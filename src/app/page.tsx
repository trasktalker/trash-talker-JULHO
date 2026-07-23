// app/page.tsx
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  // Verifica a sessão do lado do servidor
  const session = await getServerSession();

  // Se já estiver autenticado, vai direto para a dashboard
  if (session) {
    redirect("/dashboard");
  }

  // Caso contrário, renderiza a landing page para visitantes
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar da Landing (apenas Logo + Botões de Login) */}
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto w-full">
        <h1 className="text-xl font-bold">MeuApp</h1>
        <div className="space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Começar Grátis</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section: Texto + Imagem */}
      <section className="flex-1 flex items-center max-w-7xl mx-auto px-4 gap-12">
        {/* Lado Esquerdo: Texto */}
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Construa o futuro <br />
            <span className="text-primary">em 5 dias</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-md">
            Crie seu projeto completo com autenticação, banco de dados e um
            design incrível usando as ferramentas mais atuais.
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Testar Agora</Link>
            </Button>
            <Button size="lg" variant="outline">
              Ver Demo
            </Button>
          </div>
        </div>

        {/* Lado Direito: Imagem Grande */}
        <div className="flex-1 hidden md:flex justify-center">
          <div className="w-full aspect-square max-w-lg bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center border shadow-2xl">
            {/* Substitua pelo seu next/image */}
            <span className="text-muted-foreground text-2xl">
              📸 Imagem Ilustrativa
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
