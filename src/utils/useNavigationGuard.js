import { useBlocker } from "react-router";

export function useNavigationGuard(when) {
  useBlocker(({ retry }) => {
    if (!when) {
      retry();
      return;
    }

    const confirmLeave = window.confirm(
      "Proses pengiriman email masih berlangsung. Yakin ingin meninggalkan halaman?"
    );

    if (confirmLeave) {
      retry(); // lanjutkan navigasi
    }
  }, when);
}
