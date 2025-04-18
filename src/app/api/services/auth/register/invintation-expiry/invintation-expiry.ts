export function isInvitationExpired(invitation: { expiresAt: Date }) {
  return invitation.expiresAt < new Date();
}