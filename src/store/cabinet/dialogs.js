import UserEditDialog from './dialogs/user';
import UserNotificationEditDialog from './dialogs/usersNotification';
import EntityEditDialog from './dialogs/entity';
import NotificationEditDialog from './dialogs/notification'
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
    userNotification: UserNotificationEditDialog,
    campaign: AdsCampaignEditDialog,
    setting: SettingEditDialog,
    entity: EntityEditDialog,
    notification: NotificationEditDialog,
    entityComment: EntityCommentEditDialog,
    entityRating: EntityRatingEditDialog,
    aviClaim: AviClaimEditDialog,
    partyClaim: PartyClaimEditDialog,
  },
}
