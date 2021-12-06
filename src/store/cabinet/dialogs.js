import UserEditDialog from './dialogs/user';
import EntityEditDialog from './dialogs/entity';
import AviClaimEditDialog from './dialogs/aviClaim';
import AviCommentEditDialog from './dialogs/aviComment';
import AviRatingEditDialog from './dialogs/aviRating';
import AdsCampaignEditDialog from './dialogs/campaign';
import PartyCommentEditDialog from './dialogs/partyComment';
import PartyClaimEditDialog from './dialogs/partyClaim';

export default {
  namespaced: true,
  modules: {
    user: UserEditDialog,
    campaign: AdsCampaignEditDialog,
    entity: EntityEditDialog,
    aviClaim: AviClaimEditDialog,
    aviComment: AviCommentEditDialog,
    aviRating: AviRatingEditDialog,
    partyClaim: PartyClaimEditDialog,
    partyComment: PartyCommentEditDialog,
  },
}
