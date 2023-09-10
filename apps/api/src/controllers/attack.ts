import { APIError } from '@darkthrone/client-library';
import { Request, Response } from 'express';

export default {
  POST_attackPlayer: async (req: Request, res: Response) => {
    const { targetID, attackTurns } = req.body;

    const apiErrors: APIError[] = [];
    if (!targetID || !attackTurns) {
      apiErrors.push({
        code: 'attack_target_id_and_attack_turns_required',
        title: 'Target ID and attack turns required',
      });
    }

    if (attackTurns < 1 || attackTurns > 10) {
      apiErrors.push({
        code: 'attack_target_attack_turns_invalid',
        title: 'Attack turns must be between 1 and 10',
      });
    }

    if (req.ctx.authedPlayer.attackTurns < attackTurns) {
      apiErrors.push({
        code: 'attack_target_not_enough_attack_turns',
        title: 'Not enough attack turns',
      });
    }

    if (apiErrors.length > 0) {
      res.status(400).send({ errors: apiErrors });
      return;
    }

    const targetPlayer = await req.ctx.modelFactory.player.fetchByID(req.ctx, targetID);
    if (!targetPlayer) {
      res.status(404).send({
        errors: [{
          code: 'attack_target_not_found',
          title: 'Target not found',
        }],
      });
      return;
    }

    const warHistory = await req.ctx.authedPlayer.attackPlayer(targetPlayer, attackTurns);

    res.status(200).send(warHistory.serialise());
  }
}
