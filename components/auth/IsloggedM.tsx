import  { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import cookie from 'js-cookie'
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { useMutation } from '@apollo/client';
import { JOIN_CREATOR } from '../../apollo/queries/auth';
import { useRecoilState } from 'recoil'
import { UserAtom } from '../../atom/creator'
import { shortenAddress, TOKEN_NAME, USER_ADDRES } from '../../util/constants'
import { IAssetData } from '../../helpers/types';
import { ChainType, getChainId } from '../../helpers/api';
import toast from 'react-hot-toast';
// import '../../styles/Home.module.css'


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
  const [walletAlt, setWalletAlt] = useState(false)
  const [show, setShow] = useState(false)
  const [loadingConnect, setLoadingConnect] = useState(false)
  const [user, setUser] = useRecoilState(UserAtom)
  const [userNftName, setUserNftName] = useState<string>()
  const [ joinCreator ] = useMutation(JOIN_CREATOR)
  const router = useRouter()

  const logout = () => {
    cookie.remove(TOKEN_NAME)
    cookie.remove(USER_ADDRES)
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

  const joinUser = async (address: string): Promise<void> => {
    setUser(address)
    const toastId = toast.loading('Loading...');
    
    try {
      joinCreator({
        variables: { address: address },
        onCompleted({ join }) {
          toast.success('Login successful', {
            id: toastId,
          })
          cookie.set(TOKEN_NAME, join?.token, { expires: 40, sameSite: 'None', secure: true })
          cookie.set(USER_ADDRES, address, { expires: 40, sameSite: 'None', secure: true })
          nftName('SWHZAHIVQKYBY4ONSLEGMQAZE6LNTOREKIONNLLBLYAITYSPLUEXBLI6ZU')
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

  const myAlgoWallet = async () => {
    const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });
    const settings = {
      shouldSelectOneAccount: false,
      openManager: false
    };
    
    const accounts = await myAlgoConnect.connect(settings);
    console.log(accounts)
    const address = accounts[0].address
    joinUser(address)
  }


  const nftName =  (address:string) => {
    const nftName = fetch(`https://api.nf.domains/nfd/address?address=${address}`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const name = data[0].name
        setUser(name)
        cookie.set(USER_ADDRES, name, { expires: 40, sameSite: 'None', secure: true })
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  useEffect(() => {
    const address = cookie.get(USER_ADDRES)
    if(address) {
      setUser(`${address}`)
    }
  }, [setUser])

  return (
    <>
      {!user ? 
        <>
          {/* <button onClick={() => router.push('/auth?mode=signup')} className='authBtn text-white bg-[#4059AD]'>Sign Up</button>
          <button onClick={() => router.push('/auth?mode=login')} className='authBtn text-[#4059AD]'>Login</button> */}
          <button onClick={() => !walletAlt ? setWalletAlt(true) : setWalletAlt(false)} className='authBtn text-[#4059AD] border border-[#4059AD]'>Connect Wallet</button>
          {!walletAlt ? 
          <> 
          </> :
          <>
            <div className="block mt-3 transition-all"> 
              <a className='block authBtn text-[#4059AD] border border-[#4059AD] w-[172px] mt-4' onClick={myAlgoWallet} href="#">My Algo Wallet <i className="uil uil-arrow-right"></i></a>
              <a className='block authBtn text-[#4059AD] border border-[#4059AD] w-[172px] mt-4' onClick={walletConnectInit}  href="#">WalletConnect <i className="uil uil-arrow-right"></i></a>
            </div>
          </>
          }
          
        </> :

        <div>
          <button onClick={() => setShow(!show ? true : false)} className='authBtn text-[#4059AD] border border-[#4059AD]'>
          { user.length < 50 ? user : shortenAddress(user) }</button>
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