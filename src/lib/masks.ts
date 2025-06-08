export function applyPhoneMask(value: string): string {
  let phoneNumber = value.replace(/\D/g, "");
  phoneNumber = phoneNumber.substring(0, 11);

  if (phoneNumber.length <= 2) {
    return phoneNumber;
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2)}`;
  } else if (phoneNumber.length <= 10) {
    return `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(
      2,
      6
    )}-${phoneNumber.substring(6)}`;
  } else {
    return `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(
      2,
      7
    )}-${phoneNumber.substring(7)}`;
  }
}

export function applyTaxIdMask(value: string): string {
  let numeric = value.replace(/\D/g, "");

  if (numeric.length <= 11) {
    // CPF: 000.000.000-00
    numeric = numeric.substring(0, 11);
    return numeric
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    // CNPJ: 00.000.000/0000-00
    numeric = numeric.substring(0, 14);
    return numeric
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
}
