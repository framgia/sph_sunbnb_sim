<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification {
    use Queueable;

    public $url;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $url) {
        $this->url = $url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage {
        return (new MailMessage)
            ->line('We have received a request to reset the password associated with your account on SunBnB. 
            To proceed with the password reset, click the button below:')
            ->action('Click to reset', $this->url)
            ->line('If you did not request a password reset or if you believe this email was sent in error, please ignore it. 
            Your account security is important to us, and we apologize for any inconvenience this may have caused.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array {
        return [
            //
        ];
    }
}
