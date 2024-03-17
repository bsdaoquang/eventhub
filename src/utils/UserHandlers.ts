import userAPI from '../apis/userApi';
import {addFollowedEvent, updateFollowing} from '../redux/reducers/authReducer';

export class UserHandle {
  static getFollowersById = async (id: string, dispatch: any) => {
    if (id) {
      const api = `/get-followed-events?uid=${id}`;

      try {
        const res = await userAPI.HandleUser(api);

        if (res && res.data) {
          dispatch(addFollowedEvent(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  static getFollowingByUid = async (id: string, dispatch: any) => {
    const api = `/get-follwings?uid=${id}`;

    try {
      const res = await userAPI.HandleUser(api);
      dispatch(updateFollowing(res.data));
    } catch (error) {
      console.log();
    }
  };
}
