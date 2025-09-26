// src/pages/profile/affiliate-register.tsx

import { Box, Button, Input, Page, Text } from "zmp-ui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Vui lòng nhập họ và tên"),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
});

type FormData = z.infer<typeof schema>;

const AffiliateRegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Đăng ký AFF 1 Click:", data);
    // Gửi yêu cầu đăng ký lên server và chờ admin duyệt
  };

  return (
    <Page>
      <Box className="p-4">
        <Text.Title className="text-center mb-4">
          Đăng ký AFF 1 Click
        </Text.Title>
        <Text className="text-center mb-6">
          Trở thành đối tác của chúng tôi và kiếm tiền bằng cách chia sẻ sản
          phẩm.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Họ và tên"
                errorText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Số điện thoại"
                type="text"
                errorText={errors.phone?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                type="text"
                errorText={errors.email?.message}
              />
            )}
          />
          <Button type="highlight" fullWidth onClick={handleSubmit(onSubmit)}>
            Đăng ký
          </Button>
        </form>
        <Text size="xSmall" className="text-center text-gray-500 mt-4">
          Sau khi đăng ký, yêu cầu của bạn sẽ được gửi đến quản trị viên để xét
          duyệt.
        </Text>
      </Box>
    </Page>
  );
};

export default AffiliateRegisterPage;