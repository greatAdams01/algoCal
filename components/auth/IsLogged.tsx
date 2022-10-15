import  { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import cookie from 'js-cookie'
import { useMutation } from '@apollo/client';
import { JOIN_CREATOR } from '../../apollo/queries/auth';
import { useRecoilState } from 'recoil'
import { UserAtom } from '../../atom/creator'
import { shortenAddress, TOKEN_NAME } from '../../util/constants'
import { IAssetData } from '../../helpers/types';
import { ChainType, getChainId } from '../../helpers/api';
import toast from 'react-hot-toast';

interface IResult {
  method: string;
  body: Array<
    Array<{
      txID: string;
      signingAddress?: string;
      signature: string;
    } | null>
  >;
}
interface IAppState {
  connector: WalletConnect | null;
  fetching: boolean;
  connected: boolean;
  showModal: boolean;
  pendingRequest: boolean;
  signedTxns: Uint8Array[][] | null;
  pendingSubmissions: Array<number | Error>;
  uri: string;
  accounts: string[];
  address: string;
  result: IResult | null;
  chain: ChainType;
  assets: IAssetData[];
}

const INITIAL_STATE: IAppState = {
  connector: null,
  fetching: false,
  connected: false,
  showModal: false,
  pendingRequest: false,
  signedTxns: null,
  pendingSubmissions: [],
  uri: "",
  accounts: [],
  address: "",
  result: null,
  chain: ChainType.TestNet,
  assets: [],
};

function IsLogged() {
  const [connectorItem, setConnectorItem] = useState<any>()
  const [show, setShow] = useState(false)
  const [loadingConnect, setLoadingConnect] = useState(false)
  const [user, setUser] = useRecoilState(UserAtom)
  const [connectState, setConnectState] = useState<IAppState>()
  const [ joinCreator ] = useMutation(JOIN_CREATOR)
  const router = useRouter()

  const logout = () => {
    cookie.remove(TOKEN_NAME)
    setUser('')
    router.push('/')
  }

  const walletConnectInit = async () => {

    setLoadingConnect(true)
    const bridge = "https://bridge.walletconnect.org";

    // create new connector
    const connector = await new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

    // console.log(connector)
    let address
    // check if already connected
    if (!connector.connected) {
      // create new session
      await connector.createSession({ chainId: connector.chainId });
    }
    address = await connector.accounts[0]
    if(address) {
      joinUser(address)
    }
  }

  const joinUser = (address: string): void => {
    console.log(address)
    setUser(address)
    const toastId = toast.loading('Loading...');
    try {
      joinCreator({
        variables: { address: address },
        onCompleted({ join }) {
          toast.success('Login successful', {
            id: toastId,
          })
          console.log(join)
          cookie.set(TOKEN_NAME, join?.token, { expires: 40, sameSite: 'None', secure: true })
          router.push('/event')
        },
        onError(error) {
          console.log(error.message)
          toast.error(error.message, {
            id: toastId,
          });
        },
      },
      )
    } catch (error) {
      console.log(error)
    }
  }



  // useEffect(() => {
  //   setUser(connectorItem?.accounts[0])
  // }, [loadingConnect]);

  return (
    <>
      {!user ? 
        <>
          {/* <button onClick={() => router.push('/auth?mode=signup')} className='authBtn text-white bg-[#4059AD]'>Sign Up</button>
          <button onClick={() => router.push('/auth?mode=login')} className='authBtn text-[#4059AD]'>Login</button> */}
          <button onClick={walletConnectInit} className='authBtn text-[#4059AD] border border-[#4059AD]'>Connect Wallet</button>
        </> :

        <div>
          <button onClick={() => setShow(!show ? true : false)} className='authBtn text-[#4059AD] border border-[#4059AD]'>{ shortenAddress(user) }</button>
          <div className={show ? 'block absolute text-center border w-[119px]' : 'hidden text-center'}>
            <button onClick={() => router.push('/event')} className=' boder-[#4059AD] text-[#4059AD]'>Profile</button> <br />
            <button onClick={logout} className='border-t boder-[#4059AD] text-[#4059AD]'>Log out</button>
          </div>
        </div>

      }
    </>
  )
}

export default IsLogged