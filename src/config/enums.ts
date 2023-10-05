export enum Role {
  superAdmin = 'SUPER_ADMIN',
  admin = 'ADMIN',
  customer = 'CUSTOMER',
  technician = 'TECHNICIAN',
  agent = 'AGENT',
}

export enum JobStatus {
  pending = 'PENDING',
  ongoing = 'ONGOING',
  completed = 'COMPLETED',
  delayed = 'DELAYED',
  canceled = 'CANCELED',
  approved = 'APPROVED',
  flagged = 'FLAGGED',
}

export enum InspectionStatus {
  pending = 'PENDING',
  approved = 'APPROVED',
  rejected = 'REJECTED',
  flagged = 'FLAGGED',
}

export enum JobType {
  pending = 'PENDING',
  ongoing = 'ONGOING',
  completed = 'COMPLETED',
  delayed = 'DELAYED',
  canceled = 'CANCELED',
}

export enum AssigneCategory {
  location = 'LOCATION',
  insepction = 'INSPECTION',
  user = 'USER',
}

export enum ImageType {
  general = 'GENERAL',
  map = 'MAP',
}

export enum DocumentsType {
  insurance = 'INSURANCE',
  msdsSheet = 'MSDS_SHEET',
  license = 'LICENSE',
  aibReport = 'AIB_REPORT',
  label = 'LABEL',
}
