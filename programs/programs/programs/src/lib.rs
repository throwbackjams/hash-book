use anchor_lang::prelude::*;
use std::mem::size_of;
use anchor_spl::token::{self, Token};

declare_id!("85EZivKT8uvAaphRcUfaN15Wu9PUL4eXBSh28PPDaTAE");

const TEXT_LENGTH: usize = 1024;
const USER_NAME_LENGTH: usize = 100;
const USER_URL_LENGTH: usize = 255;

#[program]
pub mod programs {
    use super::*;

    pub fn create_state(ctx: Context<CreateState>) -> Result<()> {
        
        let state = &mut ctx.accounts.state;

        state.authority = ctx.accounts.authority.key();

        state.post_count = 0;
        Ok(())
    }

    pub fn create_post(
        ctx: Context<CreatePost>, 
        text: String, 
        poster_name: String, 
        poster_url: String) -> Result<()> {
            
            let state = &mut ctx.accounts.state;

            let post = &mut ctx.accounts.post;

            post.authority = ctx.accounts.authority.key();
            post.text = text;
            post.poster_name = poster_name;
            post.poster_url = poster_url;
            post.comment_count = 0;
            post.index = state.post_count;
            post.post_time = ctx.accounts.clock.unix_timestamp;

            state.post_count +=1;

            Ok(())
        }

    pub fn create_comment(
        ctx: Context<CreateComment>,
        text: String,
        commenter_name: String,
        commenter_url: String
    ) -> Result<()> {
        let post = &mut ctx.accounts.post;

        let comment_account = &mut ctx.accounts.comment;

        comment_account.authority = ctx.accounts.authority.key();
        comment_account.text = text;
        comment_account.commenter_name = commenter_name;
        comment_account.commenter_url = commenter_url;
        comment_account.index = post.comment_count;

        comment_account.post_time = ctx.accounts.clock.unix_timestamp;

        post.comment_count = post.comment_count.checked_add(1).expect("Comment count increment error");

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateState<'info>{
    #[account(
        init,
        seeds = [b"state".as_ref()], //TODO: add authority key as seed
        bump,
        payer = authority,
        space = size_of::<StateAccount>() + 8
    )]
    pub state: Account<'info, StateAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct CreatePost<'info>{
    #[account(mut, seeds = [b"state".as_ref()], bump)]
    pub state: Account<'info, StateAccount>, //TODO: add check that state.authority matches authority signer
    #[account(
        init,
        seeds = [b"post".as_ref(), state.post_count.to_be_bytes().as_ref()], //TODO: add authority key as seed
        bump,
        payer = authority,
        space = size_of::<PostAccount>() + USER_URL_LENGTH + TEXT_LENGTH + USER_NAME_LENGTH
    )]
    pub post: Account<'info, PostAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct CreateComment<'info>{
    #[account(mut, seeds = [b"post".as_ref(), post.index.to_be_bytes().as_ref()], bump)]
    pub post: Account<'info, PostAccount>,
    #[account(
        init,
        seeds = [
            b"comment".as_ref(), 
            post.index.to_be_bytes().as_ref(), 
            post.comment_count.to_be_bytes().as_ref()],
        bump,
        payer = authority,
        space = size_of::<CommentAccount>()+ TEXT_LENGTH + USER_NAME_LENGTH + USER_URL_LENGTH
    )]
    pub comment: Account<'info, CommentAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,
    pub clock: Sysvar<'info, Clock>,
}

#[account]
pub struct StateAccount {
    pub authority: Pubkey,
    pub post_count: u64,
}

#[account]
pub struct PostAccount {
    pub authority: Pubkey,
    pub text: String,
    pub poster_name: String,
    pub poster_url: String,
    pub comment_count: u64,
    pub index: u64,
    pub post_time: i64,
}

#[account]
pub struct CommentAccount{
    pub authority: Pubkey,
    pub text: String,
    pub commenter_name: String,
    pub commenter_url: String,
    pub index: u64,
    pub post_time: i64, //NTS: probably should save a post info too so can easily find the corresponding post if have comment account
}
