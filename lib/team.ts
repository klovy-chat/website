export type TeamMember = {
  id: string;
  name: string;
  role: string;
  profile: string;
  /** Opcjonalny hash avatara z Discord — bez tego używany jest domyślny avatar z CDN */
  avatarHash?: string;
};

/** Domyślny avatar Discord wyliczany z ID użytkownika */
export function getDiscordAvatarUrl(userId: string, avatarHash?: string): string {
  if (avatarHash) {
    const ext = avatarHash.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${ext}?size=256`;
  }

  const index = Number((BigInt(userId) >> BigInt(22)) % BigInt(6));
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "668879650792931329",
    name: "klovy0603",
    role: "Founder & CEO",
    profile: "https://discord.com/users/668879650792931329",
  },
  {
    id: "1141622151728869407",
    name: "MaksiK023",
    role: "Administrator",
    profile: "https://discord.com/users/1141622151728869407",
  },
  {
    id: "208572267834114049",
    name: "HeXer69",
    role: "Administrator",
    profile: "https://discord.com/users/208572267834114049",
  },
  {
    id: "1105200996021440584",
    name: "R00trix",
    role: "Moderator",
    profile: "https://discord.com/users/1105200996021440584",
  },
  {
    id: "791268473559973890",
    name: "Zeroday",
    role: "Moderator",
    profile: "https://discord.com/users/791268473559973890",
  },
  {
    id: "1087829498810073269",
    name: "Zayden",
    role: "Moderator",
    profile: "https://discord.com/users/690135413079408680",
  },
  {
    id: "1013038112038981682",
    name: "Kocurowy96",
    role: "Support",
    profile: "https://discord.com/users/1013038112038981682",
  },
  {
    id: "1427622869575405668",
    name: "KitsunePL",
    role: "Support",
    profile: "https://discord.com/users/1427622869575405668",
  },
];
