<?php
namespace Craft;

/**
 * Contact Form service
 */
class ContactFormService extends BaseApplicationComponent
{
	/**
	 * Sends an email submitted through a contact form.
	 *
	 * @param ContactFormModel $message
	 * @throws Exception
	 * @return bool
	 */
	public function sendMessage(ContactFormModel $message)
	{
		$settings = craft()->plugins->getPlugin('contactform')->getSettings();

		if (!$settings->toEmail)
		{
			throw new Exception('The "To Email" address is not set on the plugin’s settings page.');
		}

		// Fire an 'onBeforeSend' event
		Craft::import('plugins.contactform.events.ContactFormEvent');
		$event = new ContactFormEvent($this, array('message' => $message, 'settings' => $settings));
		$this->onBeforeSend($event);

		if ($event->isValid)
		{
			if (!$event->fakeIt)
			{
				// Grab any "to" emails set in the plugin settings.
				$toEmails = ArrayHelper::stringToArray($settings->toEmail);

				foreach ($toEmails as $toEmail)
				{
					$variables = array();
					$email = new EmailModel();
					$emailSettings = craft()->email->getSettings();

					$email->fromEmail = $emailSettings['emailAddress'];
					$email->replyTo   = $message->fromEmail;
					$email->sender    = $emailSettings['emailAddress'];
					$email->fromName  = $settings->prependSender . ($settings->prependSender && $message->fromName ? ' ' : '') . $message->fromName;
					$email->toEmail   = $toEmail;
					$email->subject   = '{{ emailSubject }}';
					$email->body      = '{{ emailBody }}';

					$variables['emailSubject'] = $settings->prependSubject . ($settings->prependSubject && $message->subject ? ' - ' : '') . $message->subject;
					$variables['emailBody'] = $message->message;

					if (!empty($message->htmlMessage))
					{
						// Prevent Twig tags from getting parsed
						$email->htmlBody = str_replace(array('{', '}'), array('&lbrace;', '&rbrace;'), $message->htmlMessage);
					}

					if (!empty($message->attachment))
					{
						foreach ($message->attachment as $attachment)
						{
							if ($attachment)
							{
								$email->addAttachment($attachment->getTempName(), $attachment->getName(), 'base64', $attachment->getType());
							}
						}
					}
					$telegram_message = implode(" \n",$variables) . ". \n" . "От " . $message->fromEmail;
					craft()->contactForm->alarmerbotsend('-233062513', $telegram_message);
					craft()->email->sendEmail($email, $variables);

				}
			}

			return true;
		}

		return false;
	}

	/**
	 * Fires an 'onBeforeSend' event.
	 *
	 * @param ContactFormEvent $event
	 */
	public function onBeforeSend(ContactFormEvent $event)
	{
		$this->raiseEvent('onBeforeSend', $event);
	}
			/**
	 * Fires an 'onBeforeMessageCompile' event.
	 *
	 * @param ContactFormMessageEvent $event
	 */
	public function onBeforeMessageCompile(ContactFormMessageEvent $event)
	{
		$this->raiseEvent('onBeforeMessageCompile', $event);
	}
	public function alarmerbotsend($chat_id, $message)
	{
		$ch = curl_init("https://api.telegram.org/bot415801004:AAElhjvxkQHZUzK1WgWzg1xTcFlddmvb2YY/sendMessage");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 3);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_POSTFIELDS, array(
			"chat_id" => $chat_id,
			"text" => $message,
		));
		curl_exec($ch);
		curl_close($ch);
	}
}
