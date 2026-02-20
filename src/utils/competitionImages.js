const modules = import.meta.glob(
  "/src/assets/images/competition/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

export const competitionImages = Object.entries(modules).reduce(
  (acc, [path, src]) => {
    const parts = path.split("/");
    const competitionId = parts[parts.length - 2]; // folder name (1,2,3...)

    if (!acc[competitionId]) acc[competitionId] = [];

    acc[competitionId].push(src);

    return acc;
  },
  {}
);
