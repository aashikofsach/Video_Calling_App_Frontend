import { ADD_PEER, REMOVE_PEER } from "../Actions/peerAction";

export type PeerState = Record<string, { stream: MediaStream }>;

// above code is equivalent to
// type PeerState = {
//   [peerId: string]: {
//     stream: MediaStream;
//   };
// };

//in below one typeof with add_peer have very amazing meaning
type PeerAction =
  | {
      type: typeof ADD_PEER;
      payload: { peerId: string; stream: MediaStream };
    }
  | {
      type: typeof REMOVE_PEER;
      payload: { peerId: string };
    };

export const peerReducer = (state: PeerState, action: PeerAction) => {
  switch (action.type) {
    case ADD_PEER:
      return {
        ...state,
        [action.payload.peerId]: { stream: action.payload.stream },
      };

//     case REMOVE_PEER:
//      { const { [action.payload.peerId] : _ , ...rest } = state;
//       return rest ;
// }

    default:
      return { ...state };
  }
};
