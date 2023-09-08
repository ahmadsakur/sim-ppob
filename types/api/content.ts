export type ServiceType = {
  service_code: string;
  service_icon: string;
  service_name: string;
  service_tariff: number;
};

export type BannerType = {
  banner_image: string;
  banner_name: string;
  description: string;
};

export type ProfileType = {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
};

export type ResponseType<T> = {
  data: T;
  message: string;
  status: number;
};

export type ServicesType = ResponseType<ServiceType[]>;
export type BannersType = ResponseType<BannerType[]>;
export type ProfileResponseType = ResponseType<ProfileType>;
export type BalanceResponseType = ResponseType<{ balance: number }>;

