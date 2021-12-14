import UserEditDialog from './dialogs/user';
import EntityEditDialog from './dialogs/entity';
import EntityCommentEditDialog from './dialogs/entityComment';
import EntityRatingEditDialog from './dialogs/entityRating';
import AviClaimEditDialog from './dialogs/aviClaim';
import AdsCampaignEditDialog from './dialogs/campaign';
import PartyClaimEditDialog from './dialogs/partyClaim';
import SettingEditDialog from './dialogs/setting'

export default {
  namespaced: true,
  modules: {
    user: UserEditDialog,
    campaign: AdsCampaignEditDialog,
    setting: SettingEditDialog,
    entity: EntityEditDialog,
    entityComment: EntityCommentEditDialog,
    entityRating: EntityRatingEditDialog,
    aviClaim: AviClaimEditDialog,
    partyClaim: PartyClaimEditDialog,
  },
}
