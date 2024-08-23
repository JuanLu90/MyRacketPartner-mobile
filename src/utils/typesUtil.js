// formats
export const ROUND_ROBIN = "ROUND_ROBIN";
export const SINGLE_TOURNAMENT = "SINGLE_TOURNAMENT";
export const PLAYOFFS = "PLAYOFFS";

// modes
export const ONE_WAY = "ONE_WAY";
export const ROUND_TRIP = "ROUND_TRIP";

export const tournamentsFormatTypes = {
  [ROUND_ROBIN]: {
    name: "TypesTournaments.RoundRobin.Name",
    description: "TypesTournaments.RoundRobin.Description",
    mode: {
      ONE_WAY: {
        name: "TypesTournaments.RoundRobin.Mode.OneWay.Name",
        description: "TypesTournaments.RoundRobin.Mode.OneWay.Description",
      },
      ROUND_TRIP: {
        name: "TypesTournaments.RoundRobin.Mode.RoundTrip.Name",
        description: "TypesTournaments.RoundRobin.Mode.RoundTrip.Description",
      },
    },
  },
  [SINGLE_TOURNAMENT]: {
    name: "TypesTournaments.SingleElimination.Name",
    description: "TypesTournaments.SingleElimination.Description",
  },
  [PLAYOFFS]: {
    name: "TypesTournaments.Playoffs.Name",
    description: "TypesTournaments.Playoffs.Description",
    mode: {
      ONE_WAY: {
        name: "TypesTournaments.Playoffs.Mode.OneWay.Name",
        description: "TypesTournaments.Playoffs.Mode.OneWay.Description",
      },
      ROUND_TRIP: {
        name: "TypesTournaments.Playoffs.Mode.RoundTrip.Name",
        description: "TypesTournaments.Playoffs.Mode.RoundTrip.Description",
      },
    },
  },
};

export const tournamentsFormatOptions = {
  [ROUND_ROBIN]: [
    { name: "Participants", showIfIsStarted: true },
    { name: "Results", showIfIsStarted: false },
    { name: "Classification", showIfIsStarted: false },
    { name: "Schedule", showIfIsStarted: true },
    { name: "Settings", showIfIsStarted: true },
  ],
  [SINGLE_TOURNAMENT]: [
    { name: "Participants", showIfIsStarted: true },
    { name: "Results", showIfIsStarted: false },
    { name: "Draw", showIfIsStarted: true },
    { name: "Settings", showIfIsStarted: true },
  ],
  [PLAYOFFS]: [
    { name: "Participants", showIfIsStarted: true },
    { name: "Results", showIfIsStarted: false },
    { name: "Classification", showIfIsStarted: false },
    { name: "Schedule", showIfIsStarted: true },
    { name: "Settings", showIfIsStarted: true },
  ],
};

export const tournamentRoundTitleOptions = {
  1: "TypesRoundsTournament.Final",
  2: "TypesRoundsTournament.Semifinal",
  3: "TypesRoundsTournament.Quarter",
  4: "TypesRoundsTournament.16",
};

export const tournamentVictoryPointsOptions = [1, 2, 3];
export const tournamentDefeatPointsOptions = [0, 1, 2];

export const invitationStatusOptions = ["PENDING", "ACCEPTED", "REJECTED"];
export const genderOptions = [
  { value: "MALE", label: "EditProfile.Personal.Gender.Types.MALE" },
  { value: "FEMALE", label: "EditProfile.Personal.Gender.Types.FEMALE" },
  { value: "OTHER", label: "EditProfile.Personal.Gender.Types.OTHER" },
];

export const dominantHandOptions = [
  { value: "RIGHT", label: "EditProfile.Player.DominantHand.Types.RIGHT" },
  { value: "LEFT", label: "EditProfile.Player.DominantHand.Types.LEFT" },
  { value: "BOTH", label: "EditProfile.Player.DominantHand.Types.BOTH" },
];

export const backhandOptions = [
  { value: "ONE", label: "EditProfile.Player.Backhand.Types.ONE" },
  { value: "TWO", label: "EditProfile.Player.Backhand.Types.TWO" },
  { value: "NONE", label: "EditProfile.Player.Backhand.Types.NONE" },
];

export const getLabelForOptions = (value, options) => {
  const option = options.find((option) => option.value === value);
  return option ? option.label : "-";
};

export const translateOptions = (options, translate) => {
  return options.map((option) => ({
    ...option,
    label: translate(option.label),
  }));
};
