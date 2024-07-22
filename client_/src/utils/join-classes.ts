export default function JoinClasses(mainClass: string, ...rest: any) {
  const obj = rest;

  for (const [_, value] of Object.entries(obj)) {
    if (value) {
      mainClass += " " + value;
    }
  }

  return mainClass;
}
