import UserEditDialog from './dialogs/user';
import EntityEditDialog from './dialogs/entity';
import EntityCommentEditDialog from './dialogs/entityComment';
import EntityRatingEditDialog from './dialogs/entityRating';
import AviClaimEditDialog from './dialogs/aviClaim';
import AdsCampaignEditDialog from './dialogs/campaign';
import PartyClaimEditDialog from './dialogs/partyClaim';

export default {
  namespaced: true,
  modules: {
    user: UserEditDialog,
    campaign: AdsCampaignEditDialog,
    entity: EntityEditDialog,
    entityComment: EntityCommentEditDialog,
    entityRating: EntityRatingEditDialog,
    aviClaim: AviClaimEditDialog,
    partyClaim: PartyClaimEditDialog,
  },
}
