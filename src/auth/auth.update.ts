// import { Update, Ctx, Start, On } from '@nestjs/telegraf';
// import { Context, Scenes } from 'telegraf';
// import { AuthService } from './auth.service';

// @Update()
// export class AuthUpdate {
//   constructor(private readonly authService: AuthService) {}

//   @Start()
//   async onStart(@Ctx() ctx: Context) {
//     const user = await this.authService.validateOrCreateUser(ctx.from);
//     await ctx.reply(`Вітаю, ${user.firstName}!`);
//   }

//   @On('message')
//   async onMessage(@Ctx() ctx: Context) {
//     await ctx.reply('Повідомлення отримано!');
//   }
// }