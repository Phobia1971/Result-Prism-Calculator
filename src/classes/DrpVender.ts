import { DRP, VendorDrp } from "../types/types"

const Essilor1:VendorDrp = {
  vendor : 'Essilor',
  drpStr : '2/3 add',
  drp : DRP["E2/3"],
  desc : '2/3 van de additie dient als drp.'
} 

const Essilor2:VendorDrp = {
  vendor : 'Essilor',
  drpStr : '1/3 add',
  drp : DRP["E1/3"],
  desc : '1/3 van de additie dient als drp.'
} 

const Hoya:VendorDrp = {
  vendor : 'Hoya',
  drpStr : '1/3 add',
  drp : DRP["E1/3"],
  desc : '1/3 van de additie dient als drp.'
} 

const Nikon:VendorDrp = {
  vendor : 'Nikon',
  drpStr : '1/2 add',
  drp : DRP["N1/2"],
  desc : '1/2 van de additie dient als drp.'
} 

const BBGR:VendorDrp = {
  vendor : 'BBGR',
  drpStr : '2/3 add',
  drp : DRP["B2/3"],
  desc : '2/3 van de additie dient als drp.'
}

const DrpVendors:VendorDrp[] = [
  Essilor1,
  Essilor2,
  Hoya,
  Nikon,
  BBGR,
]

export default DrpVendors;