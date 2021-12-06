import UserEditDialog from './dialogs/user';
import EntityEditDialog from './dialogs/entity';
import EntityCommentEditDialog from './dialogs/entityComment';
import AviClaimEditDialog from './dialogs/aviClaim';
import AviRatingEditDialog from './dialogs/aviRating';
import AdsCampaignEditDialog from './dialogs/campaign';
import PartyClaimEditDialog from './dialogs/partyClaim';

export default {
  namespaced: true,
  modules: {
    user: UserEditDialog,
    campaign: AdsCampaignEditDialog,
    entity: EntityEditDialog,
    entityComment: EntityCommentEditDialog,
    aviClaim: AviClaimEditDialog,
    aviRating: AviRatingEditDialog,
    partyClaim: PartyClaimEditDialog,
  },
}
