import kittBankLogo from '@/assets/images/kittbank-logo.jpg';
export function Logo() {
  return (
    <div className="flex items-center justify-between gap-2">
      <img
        alt="logo"
        className="my-2 w-14 rounded-full bg-center object-cover"
        src={kittBankLogo}
      />
      <span className="font-semibold text-3xl">Kitt Bank</span>
    </div>
  );
}
