import { Container } from "@/shared/components/layout/Container";
import { Button } from "@/shared/components/ui/Button";
import { PRACTICES_URL, SITE_URL, ACCOUNTS_URL } from "@/shared/lib/config";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-32">
      <Container className="relative text-center">
        <h2 className="text-5xl font-black text-white">
          Ready to Start{" "}
          <span className="text-purple-400">Hacking?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-gray-400">
          Join thousands of security professionals and students sharpening their
          skills every day on ExoQuest.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a href={`${ACCOUNTS_URL}/register?returnTo=${encodeURIComponent(SITE_URL)}`}>
            <Button size="lg" className="mt-6">
              Lets Hack
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}
