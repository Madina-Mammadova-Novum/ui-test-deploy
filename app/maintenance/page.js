import Maintenance from './Maintenance';

export const metadata = {
  title: 'Launching Soon!',
};

export default function MaintenancePage() {
  return (
    <Maintenance
      title="We Will Be Launching Soon"
      description="Our service is currently under development and will be available shortly. We are diligently working to deliver an enhanced and seamless experience. Please stay tuned for updates, and we appreciate your patience during this time."
      variant="comingSoon"
    />
  );
}
