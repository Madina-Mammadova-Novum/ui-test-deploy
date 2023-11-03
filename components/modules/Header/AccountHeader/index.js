import { Notification, ProfileMenu } from '@/modules';

export default async function AccountHeader({ user }) {
  return (
    <header className="w-full shadow-xmd px-5 py-2 flex items-center">
      <div className="flex justify-end w-full items-center">
        <Notification />
        <ProfileMenu name={user.name} />
      </div>
    </header>
  );
}
