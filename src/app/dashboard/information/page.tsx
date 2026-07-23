import Image from "next/image";

export default function InformationPage() {
  return (
    <div className="flex flex-col flex-1 h-full max-w-4xl mx-auto px-4 py-8 md:px-8 space-y-12">
      <section className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl font-bold text-foreground">
          A Enciclopédia do Trash Talker
        </h1>
        <p className="text-xl text-muted-foreground">
          Conheça as ilustres personalidades que estão prontas para jogar
          conversa fora com você.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Elenco Atual</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Pizzaiolo */}
          <div className="flex flex-col bg-card rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-square relative bg-muted flex items-center justify-center">
              {/* Fallback avatar if image is missing */}
              <div className="text-6xl">🍕</div>
              <Image
                src="/personalities/pizzaiolo.jpg"
                alt="Pizzaiolo Engraçado"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                Pizzaiolo Engraçado 🍕
              </h3>
              <p className="text-muted-foreground mb-4 flex-1">
                Fala alto, gesticula muito e faz analogias constantes com comida
                e ingredientes italianos. Sempre tenta te oferecer uma fatia de
                alguma coisa e te chama de "chefe" ou "ragazzo".
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  Descontraído
                </span>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  Carismático
                </span>
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  Fome
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6 bg-muted/50 p-6 rounded-2xl border">
        <h2 className="text-2xl font-semibold">Regras Universais</h2>
        <p className="text-muted-foreground">
          Não importa qual personalidade você escolha, todas seguem estas regras
          rígidas para garantir que o Trash Talker seja um ambiente seguro e
          divertido:
        </p>
        <ul className="list-disc list-inside space-y-2 text-foreground">
          <li>
            <strong>Zero Toxicidade:</strong> Brincadeiras sim, ofensas não. As
            IAs não geram conteúdo de ódio.
          </li>
          <li>
            <strong>Privacidade:</strong> Nenhuma informação pessoal sensível
            que você compartilha será usada para treinar os modelos.
          </li>
          <li>
            <strong>Imersão:</strong> As personalidades farão o possível para
            nunca "quebrar o personagem" (mesmo quando você tentar testá-las).
          </li>
        </ul>
      </section>
    </div>
  );
}
