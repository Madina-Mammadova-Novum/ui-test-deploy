import { Copyright } from '@/elements';
import { LegalNavigation, SocialNetworks } from '@/units';

export default async function AccountFooter({ socials, legal }) {
  return (
    <footer className="shadow-xmd items-center px-5 justify-between mt-2 py-2 text-xs-sm flex 3md:flex-nowrap flex-wrap gap-2.5 ">
      <SocialNetworks data={socials} />
      <LegalNavigation data={legal} />
      <div className="w-full text-center 3md:w-auto">
        <Copyright />
      </div>
    </footer>
  );
}
