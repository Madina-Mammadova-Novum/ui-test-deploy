// app/Maintenance/page.js
import Maintenance from './Maintenance';

export const metadata = {
  title: 'Launching Soon!',
};

export default function MaintenancePage() {
  return (
    <Maintenance
      title="We're Launching Soon!"
      description="Our service is currently under development and will be live shortly. We are working hard to bring you an improved and seamless experience. Stay tuned for updates, and thank you for your patience."
      variant="comingSoon"
    />
  );
}
