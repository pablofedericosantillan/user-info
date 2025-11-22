import mongoose, { ClientSession } from 'mongoose';

export const withSession = async <T>(
  initializer: { startSession: () => Promise<ClientSession> } | undefined,
  callback: (session: ClientSession) => Promise<T>,
) => {
  const session = await (initializer || mongoose).startSession();
  if (!session) return callback(session);
  let result!: T;
  await session
    .withTransaction(async () => {
      result = await callback(session);
    })
    .finally(() => session.endSession());
  return result;
};
